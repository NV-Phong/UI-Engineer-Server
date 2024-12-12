export class CreateTeamDTO {
   teamName: string;
   teamSize: number;
   teamDescription: string;
   members: Array<{ IDUser: string }>;
}
