import { TemplateData } from './TemplateData';

export type Category = {
    id: number;
    name: string;
    linkedTemplates: TemplateData[];
    allTemplatesLinked: string;
};