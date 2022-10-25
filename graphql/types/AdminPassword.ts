import { extendType, objectType } from "nexus";

export const AdminPassword = objectType({
  name: "AdminPassword",
  definition(t) {
    t.nonNull.int("password_id");
    t.nonNull.int("user_id");
    t.string("password_hash");
    t.nonNull.int("last_updated");
    t.nonNull.field("adminUser", {
      type: "AdminUser",
      resolve: async (parent, _args, ctx): Promise<any> => {
        return await ctx.prisma.adminUser.findUnique({
          where: {
            user_id: parent.user_id,
          },
        });
      },
    });
  },
});

export const AdminPasswordQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("adminPasswords", {
      type: AdminPassword,
      resolve: async (_parent, _args, ctx): Promise<any> => {
        return await ctx.prisma.adminPassword.findMany();
      },
    });
  },
});
