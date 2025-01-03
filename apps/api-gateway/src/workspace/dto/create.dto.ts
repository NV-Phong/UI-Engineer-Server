export class CreateTeamDTO {
   teamName: string;
   teamSize: number;
   teamDescription: string;
   members: Array<{ IDUser: string }>;
}

export class CreateUILibraryDTO {
   uiLibraryName: string;
   uiLibraryDescription: string;
   version: string;
   style: string;
   IDTeam: string;
   IDtechStacks: string[];
}

export class CreateIdeaDTO {
   ideaName: string;
   ideaDescription: string;
   ideaType: string;
   ideaURL: string;
   IDTeam: string;
   ideaImage: string;
}

export class CreateComponentDTO {
   componentName: string;
   componentDescription: string;
   language: string;
   codeHTML: string;
   codeCSS: string;
   idea: string[];
   IDUILibrary: string;
}

