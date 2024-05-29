import express, { Response, Request } from "express";
import Hotel from "../models/hotel";
import { HoteSearchResponse } from "../shared/types";
const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const PageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (PageNumber - 1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments();
    const response: HoteSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: PageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    res.json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
