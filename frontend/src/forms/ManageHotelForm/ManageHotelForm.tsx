import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./Facilities";
import GuestSection from "./GuestSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;
  const onSubmit = handleSubmit((FormDataJson:HotelFormData)=>{
   const formData = new FormData()
    formData.append("name",FormDataJson.name)
    formData.append("city",FormDataJson.city)
    formData.append("country",FormDataJson.country)
    formData.append("description",FormDataJson.description)
    formData.append("type",FormDataJson.type)
    formData.append("pricePerNight",FormDataJson.pricePerNight.toString())
    formData.append("starRating",FormDataJson.starRating.toString())
    formData.append("adultCount",FormDataJson.adultCount.toString())
    formData.append("childCount",FormDataJson.childCount.toString())

    FormDataJson.facilities.forEach((facility,index)=>{
        formData.append(`facilities[${index}]`,facility)
    })
    Array.from(FormDataJson.imageFiles).forEach((imageFiles)=>{
        formData.append(`imageFiles`,imageFiles)
    })
  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button className=" bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
            Save
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
