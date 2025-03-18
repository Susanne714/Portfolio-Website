/**
 * Represents the data structure for a project entry.
 */
export interface ProjectData {
    number: string;
    title: string;
    descriptionKey: string;
    techs: { name: string; icon: string }[];
    image: string;
    githubLink: string;
    liveLink: string;
}