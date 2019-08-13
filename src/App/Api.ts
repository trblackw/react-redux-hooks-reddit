import { RedditStateSubject } from './components/Posts';
import { BehaviorSubject } from 'rxjs';
import { useState, useEffect } from 'react';
import { skip } from 'rxjs/operators';
import { SubReddit } from './types';

export const useSharedState = <T>(subject: BehaviorSubject<T>): [T, typeof useState] => {
   const [state, setState] = useState<any>(subject.getValue());
   useEffect(() => {
      const sub = subject.pipe(skip(1)).subscribe(s => setState(s));
      return () => sub.unsubscribe();
   });
   const newSetState = (state: T) => subject.next(state);
   // @ts-ignore
   return [state, newSetState];
};

export const setPartial = <T>(subject: BehaviorSubject<T>, partial: Partial<T>) => {
   const prev = subject.getValue();
   subject.next({ ...prev, ...partial });
};

export const PickerStateSubject = new BehaviorSubject({
   value: SubReddit.ReactJS
});

export const init = (): void => {
   PickerStateSubject.subscribe(async ({ value: subreddit }): Promise<void> => {
      setPartial(RedditStateSubject, {
         isFetching: true,
         posts: []
      });
      const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
      const json = await res.json();
      const prevState = RedditStateSubject.getValue();
      const { data: { children = [] } = {} } = json;
      RedditStateSubject.next({
         ...prevState,
         isFetching: false,
         lastUpdated: new Date(),
         posts: children.map(({ data }: any) => data)
      });
   });
};
