export type ProgramWithCategory = NewCourse & {
  category: {
    category_name_en: string;
    category_name_ar: string;
    category_description_en: string;
    category_description_ar: string;
  };
};

export type NewUser = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type UserDetails = {
  id?: string;
  email: string;
  role: string;
  first_name: string;
};

export type NewBanner = {
  id?: string;
  name: string | null;
  image: string | null;
  description_en: string | null;
  description_ar: string | null;
};

export type TranslatedBanner = {
  name: string;
  image: string;
  description: string | null;
};

export type NewCategory = {
  id?: string;
  category_name_en: string;
  category_name_ar: string;
  logo: string | null;
  category_description_en: string | null;
  category_description_ar: string | null;
  slug: string;
};

export type TranslatedCategory = {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  logo: string | null;
};

export type TranslatedCourse = {
  id: string;
  title: string;
  description: string | null;
  target_audience: string | string[];
  image: string | null;
  categoryId: string;
  slug: string;
  start_date: Date | null;
  end_date: Date | null;
    duration: string | null;

};

export type NewCourse = {
  id?: string;
  course_title_en: string;
  course_title_ar: string;
  course_description_en: string | null;
  course_description_ar: string | null;
  target_audience_en: string[];
  target_audience_ar: string[];
  duration: string | null;
  slug: string;
  course_image: string | null;
  category_id: string;
  start_date: Date | null;
  end_date: Date | null;
};



export type newSetting = {
  id?: string;
  key_name_en?: string | null;
  key_name_ar?: string | null;
  value_en?: string | null;
  value_ar?: string | null;
};

export type Partners = {
  id?: string;
  name: string;
  logo: string;
};

export type TranslatedPartners = {
  id?: string;
  name: string;
  logo: string;
};

export type NewApplication = {
  first_name: string;
  last_name: string;
  sponsorship_type: "self_funded" | "sponsored_by_international_organization";
  email: string;
  phone_number: string;
  country: string;
  course_id: string;
  created_at?: Date | null;
};

export type NewMember = {
  id?: string;
  name_en: string;
  name_ar: string;
  description_en: string | null;
  description_ar: string | null;
  position_en: string;
  position_ar: string;
  display_order?: number | null | undefined;
  main: boolean | null;
  image: string;
};
export type translatedMembers = {
  id?: string;
  name: string;
  description: string | null;
  position: string;
  display_order?: number | null | undefined;
  main: boolean | null;
  image: string;
};

export type MemberOrder = {
  id: string;
  display_order: number;
};

export type Locale = "en" | "ar";
