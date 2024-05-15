import { db } from "./db";

export const handleCoversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    let coversation =
      (await findConversation(memberOneId, memberTwoId)) ||
      (await findConversation(memberTwoId, memberOneId));

    if (!coversation)
      coversation = await createNewCoversation(memberOneId, memberTwoId);

    return coversation;
  } catch {
    return null;
  }
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }],
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch {
    return null;
  }
};

const createNewCoversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    return await db.conversation.create({
      data: { memberOneId, memberTwoId },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch {
    return null;
  }
};
