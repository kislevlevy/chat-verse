import { Member, Profile, Server } from "@prisma/client";

export type ServerWithMembersNProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
