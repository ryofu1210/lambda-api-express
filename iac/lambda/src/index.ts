import { Handler } from "aws-lambda";
import { compareAsc, format } from "date-fns";

// Lambda エントリーポイント
export const handler: Handler = async () => {
  console.log("Hello Lambda!");
  console.log(format(new Date(2014, 1, 11), "yyyy-MM-dd"));
};
