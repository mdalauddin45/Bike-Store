
import { Bike } from "../bike/bike.model";
import { IUser } from "../user/user.interface";
import User from "../user/user.model";

const updateUserInDB = async (id: string, updateData: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};
const deleteUserFromDB = async (id: string) => {
    const result = await Bike.findByIdAndDelete(id);
    return result;
  };
const getAllUserFromDB = async () => {
    const result = await User.find();
    return result;
  };
export const AdminServices = {
    updateUserInDB,
    deleteUserFromDB,
    getAllUserFromDB
}