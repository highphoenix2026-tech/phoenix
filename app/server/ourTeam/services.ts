import prisma from "@/lib/prisma";
import { NewMember, MemberOrder } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewMember = async (data: NewMember) => {
  try {
    const numberOfMembers = await prisma.our_team.count();
    const result = await prisma.our_team.create({
      data: { ...data, display_order: numberOfMembers + 1 },
    });
    revalidateTag("ourTeam", "max");
    return {
      data: result,
      message: "New Member Has Been Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error backend: ", error);

    return {
      data: error,
      message: "Error In Adding The Member",
      status: 500,
    };
  }
};

export const getAllMembers = unstable_cache(
  async () => {
    try {
      const result = await prisma.our_team.findMany({
        orderBy: { display_order: "asc" },
      });
      return {
        data: result,
        message: "All Members",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error In Getting All Members",
        status: 500,
      };
    }
  },
  ["all-member"],
  {
    tags: ["ourTeam"],
    revalidate: 3600,
  }
);

export const getMembersByMain = (main: boolean) =>
  unstable_cache(
    async (main: boolean) => {
      try {
        const result = await prisma.our_team.findMany({
          where: { main },
          orderBy: { display_order: "asc" },
        });
        return {
          data: result,
          message: main ? "All Main Members" : "All Not Main Members",
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          message: "Error In Getting Members",
          status: 500,
        };
      }
    },
    [`members-by-main-${main}`],
    {
      tags: ["ourTeam"],
      revalidate: 3600,
    }
  );

export const getMemberById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.our_team.findUnique({ where: { id } });
        console.log("result: ",result);
        
        if (!result)
          return { data: null, message: "Member not found", status: 409 };
        return {
          data: result,
          message: "Member fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching member", status: 500 };
      }
    },
    [`member-by-id-${id}`],
    { tags: ["ourTeam"], revalidate: 3600 }
  );

  return cachedFn();
};

export const updatMember = async (id: string, data: Partial<NewMember>) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Member Not Found",
        status: 409,
      };
    const result = await prisma.our_team.update({ where: { id }, data });
    revalidateTag("ourTeam", "max");
    return {
      data: result,
      message: "The Member Has Been Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating The Member",
      status: 201,
    };
  }
};

export const deleteMember = async (id: string) => {
  try {
    const existing = await prisma.our_team.findUnique({ where: { id } });
    if (!existing)
      return {
        data: null,
        message: "Member Not Found",
        status: 409,
      };
    const result = await prisma.our_team.delete({ where: { id } });
    revalidateTag("ourTeam", "max");
    return {
      data: result,
      message: "Member Has Been Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting Member",
      status: 500,
    };
  }
};

export const getMemberNameIdAndImage = async () => {
  try {
    const result = await prisma.our_team.findMany({
      select: { id: true, name_en: true, image: true, display_order: true },
    });
    return {
      data: result,
      message: "Member orders updated successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: [],
      message: "Error updating member orders",
      status: 500,
    };
  }
};

export const updateMemberOrder = async (members: MemberOrder[]) => {
  try {
    await prisma.our_team.updateMany({
      data: { display_order: null },
    });
    const queries = members.map((member) =>
      prisma.our_team.update({
        where: { id: member.id },
        data: { display_order: member.display_order },
      })
    );

    await Promise.all(queries);
    revalidateTag("our_team", "max");
    return {
      message: "Member orders updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error updating member orders",
      status: 500,
    };
  }
};
