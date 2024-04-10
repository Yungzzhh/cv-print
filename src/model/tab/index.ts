export interface Tabs {
    sectionName: string;
    key: 'personalInfo' | 'skills' | 'company' | 'proj' | 'edu';
    position: number;
    comp?: JSX.Element;
    sectionNameEn: string;
}