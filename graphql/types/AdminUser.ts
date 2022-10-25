import { extendType, objectType } from "nexus";
import { connectionFromArraySlice, cursorToOffset } from "graphql-relay";
import { Context } from "graphql/context";

export const AdminUser = objectType({
  name: "AdminUser",
  definition(t) {
    t.nonNull.int("user_id");
    t.string("firstname");
    t.string("lastname");
    t.nonNull.string("email");
    t.string("username");
    t.nonNull.string("password");
    t.nonNull.string("created");
    t.nonNull.string("modified");
    t.string("logdate");
    t.nonNull.int("lognum");
    t.nonNull.int("reload_acl_flag");
    t.nonNull.int("is_active");
    t.string("extra");
    t.string("rp_token");
    t.string("rp_token_created_at");
    t.nonNull.string("interface_locale");
    t.int("failures_num");
    t.string("first_failure");
    t.string("lock_expires");
    t.nonNull.list.field("adminPasswords", {
      type: "AdminPassword",
      resolve: async (_parent, _args, ctx): Promise<any> => {
        return await ctx.prisma.adminPassword.findMany();
      },
    });
  },
});

export const AdminUserQuery = extendType({
  type: "Query",
  definition(t: any) {
    t.connectionField("adminUsers", {
      type: AdminUser,
      resolve: async (_parent: any, args: any, ctx: Context): Promise<any> => {
        const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
        if (isNaN(offset)) throw new Error("Cursor is invalid");

        const [totalCount, items] = await Promise.all([
          ctx.prisma.adminUser.count(),
          ctx.prisma.adminUser.findMany({
            take: args.first,
            skip: offset,
          }),
        ]);

        return connectionFromArraySlice(
          items,
          { first: args.first, after: args.after },
          { sliceStart: offset, arrayLength: totalCount }
        );
      },
    });
  },
});
