"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import FormSelect from "../inputs/SelectorInput";
import TextInput from "../inputs/TextInput";
import Button1 from "../ui/Button1";
import Button2 from "../ui/Button2";
import CountrySelect from "../inputs/CountrySelect";
import SponsorshipSelect from "../inputs/SponsorshipSelect";

interface Props {
  initialCountry?: string;
  initialSponsorshipType?:
    | "self_funded"
    | "sponsored_by_international_organization";
  initialApplicationId?: string;
}

interface ApplicationsFilterFormValues {
  country: string;
  applicationId: string;
  sponsorshipType?: "self_funded" | "sponsored_by_international_organization";
}

export default function ApplicationsFilter({
  initialCountry = "",
  initialSponsorshipType,
  initialApplicationId,
}: Props) {
  const { handleSubmit, control, register } =
    useForm<ApplicationsFilterFormValues>({
      defaultValues: {
        country: initialCountry,
        applicationId: initialApplicationId,
        sponsorshipType: initialSponsorshipType,
      },
    });

  const onSubmit: SubmitHandler<ApplicationsFilterFormValues> = (data) => {
    const params = new URLSearchParams();
    if (data.country) params.set("country", data.country.toLowerCase());
    if (data.applicationId) params.set("applicationId", data.applicationId);
    if (data.sponsorshipType)
      params.set("sponsorshipType", data.sponsorshipType);
    window.location.href = `${window.location.pathname}?${params.toString()}`;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 ml-0 mr-0 lg:ml-4 lg:mr-4"
    >
      <div className="flex flex-wrap gap-4 items-start justify-start">
        <SponsorshipSelect
          register={register("sponsorshipType")}
          label={"Sponsorship Type"}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw]"
        />
        <CountrySelect
          register={register("country")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw]"
          label={"Nationality"}
        />

        <TextInput
          label="Id"
          register={register("applicationId")}
          className="sm:w-[35vw] md:w-[30vw] lg:w-[25vw] "
          inputClassName="py-3"
        />
      </div>

      <div className="flex gap-2 flex-row items-start justify-start">
        <Button2 type="submit" disabled={false}>
          Apply
        </Button2>

        <Button1
          type="button"
          onClick={() => (window.location.href = window.location.pathname)}
        >
          Clear
        </Button1>
      </div>
    </form>
  );
}
