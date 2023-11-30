import { z } from "zod";
import { QuixerProductSchema } from "../schemas/product";

export type QuixerProduct = z.infer<typeof QuixerProductSchema>;
