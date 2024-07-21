import { Request, Response } from "express";
import BusinessModel, { IBusiness } from "../../models/BusinessModel.ts";

// Swagger annotations remain the same

/**
 * @swagger
 * /businesses/{id}:
 *  put:
 *    description: Update an existing business
 *    tags:
 *      - Businesses
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The ID of the business
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              address:
 *                type: string
 *              category:
 *                type: string
 *              contactPerson:
 *                type: string
 *              email:
 *                type: string
 *              photo:
 *                type: string
 *    responses:
 *      200:
 *        description: Business updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Business'
 *      400:
 *        description: Invalid input
 *      404:
 *        description: Business not found
 *      500:
 *        description: An error occurred while updating the business
 */

const updateBusiness = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const business: IBusiness | null = await BusinessModel.findById(id);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    Object.keys(updateData).forEach((key) => {
      (business as any)[key] = updateData[key];
    });

    const updatedBusiness: IBusiness = await business.save();
    return res.status(200).json(updatedBusiness);
  } catch (err) {
    return res
      .status(500)
      .json({ error: "An error occurred while updating the business" });
  }
};

export default updateBusiness;
