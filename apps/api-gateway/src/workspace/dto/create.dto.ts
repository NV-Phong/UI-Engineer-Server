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
