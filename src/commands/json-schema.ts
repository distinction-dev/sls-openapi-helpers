import { Command, Flags } from "@oclif/core";
import SwaggerParser from "@apidevtools/swagger-parser";
import path from "path";
import { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

export default class JsonSchema extends Command {
  static description =
    "Generate Json Schema files to work with middy js and validator for Api Gateway event";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static flags = {
    inputFile: Flags.string({
      char: "i",
      default: "openapi.yml",
      required: false,
      description: "The path to the openapi specification file from cwd",
    }),
    outDir: Flags.string({
      char: "o",
      default: "sls-json-schema",
      required: false,
      description:
        "The output directory where you want these json schema files to be generated",
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(JsonSchema);
    const specification = await SwaggerParser.parse(
      path.join(process.cwd(), flags.inputFile)
    );
    let spec;
    if ((specification as OpenAPIV3_1.Document).openapi === "3.1.0") {
      spec = specification as OpenAPIV3_1.Document;
    } else if ((specification as OpenAPIV3.Document).openapi === "3.0.0") {
      spec = specification as OpenAPIV3.Document;
    } else {
      this.error(
        "Currently only openapi version 3.0.0 and 3.1.0 are supported"
      );
    }
    console.log(specification);
  }
}

class PathItem {
  fileName: string;
}
