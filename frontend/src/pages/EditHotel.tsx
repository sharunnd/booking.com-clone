import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const { data: hotel } = useQuery(
    "fetchMyHotelId",
    () => apiClient.fetchMyHotelId(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {mutate,isLoading} = useMutation(apiClient.updatedMyHotelById,{
    onSuccess:()=>{
      showToast({ message: "Hotel updated!", type: "SUCCESS" });
    },
    onError:()=>{
      showToast({ message: "Error updating hotel", type: "ERROR" });
    }
  })

  const handleSave = (hotelFormData: FormData)=>{
   mutate(hotelFormData)
  }

  return <ManageHotelForm onSave={handleSave} hotel={hotel} isLoading={isLoading} />;
};

export default EditHotel;
