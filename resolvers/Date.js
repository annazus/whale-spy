import { GraphQLScalarType, Kind } from "graphql";

const Date = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar tye",
  serialize(value) {
    console.log("serialzie", value);
    return value.getTime();
  },
  parseValue(value) {
    console.log("parseValue", value);

    return new Date(value);
  },
  parseLiteral(ast) {
    console.log("parseLiteral", ast.value);

    switch (ast.kind) {
      case Kind.INT:
        console.log("parseInt", ast.value);

        return parseInt(ast.value, 10);
      default:
        return null;
    }
  }
});

export { Date as default };
