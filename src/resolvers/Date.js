import { GraphQLScalarType, Kind } from "graphql";

const Date = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar tye",
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {

    return new Date(value);
  },
  parseLiteral(ast) {

    switch (ast.kind) {
      case Kind.INT:

        return parseInt(ast.value, 10);
      default:
        return null;
    }
  }
});

export { Date as default };
