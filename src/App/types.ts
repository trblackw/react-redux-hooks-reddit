export enum SubReddit {
   Popular = 'popular',
   Original = 'original',
   ReactJS = 'reactjs',
   Angular = 'angular',
   WebDev = 'webdev',
   LearnJS = 'learnjavascript',
   WebDesign = 'webdesign',
   SoftwareGore = 'softwaregore',
   ProgrammerHumor = 'programmerhumor',
   Node = 'node',
   TypeScript = 'typescript'
}

type Image = {
   id: string,
   resolutions: { url: string, width: number, height: number }[],
   source: { url: string, width: number, height: number },
   variants: any
}
export interface Images {
   preview: { enabled: boolean, images: Image[] }
}

