import { useTranslation } from 'react-i18next';

const SearchButton=()=>{
  const { t } = useTranslation();
  return (
    <div className="ml-auto max-w ">
      <button className={"lg:hidden p-1 border-t-orange-200 border-2 rounded"}>
        <svg className={"w-7 h-7"} xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24"><title>layers-search-outline</title><path fillRule="evenodd" d="M19.31 18.9C19.75 18.21 20 17.38 20 16.5C20 14 18 12 15.5 12S11 14 11 16.5 13 21 15.5 21C16.37 21 17.19 20.75 17.88 20.32L21 23.39L22.39 22L19.31 18.9M15.5 19C14.12 19 13 17.88 13 16.5S14.12 14 15.5 14 18 15.12 18 16.5 16.88 19 15.5 19M9.59 19.2L3 14.07L4.62 12.81L9 16.22C9 16.32 9 16.41 9 16.5C9 17.46 9.22 18.38 9.59 19.2M9.5 14.04L3 9L12 2L21 9L18.66 10.82C17.96 10.44 17.19 10.18 16.37 10.07L17.74 9L12 4.53L6.26 9L10.53 12.32C10.1 12.84 9.74 13.42 9.5 14.04Z" /></svg>
      </button>
      <div className="max-w mx-auto hidden lg:block">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"> {t("search")}</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-pink-300 rounded-lg bg-pink-50 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500" placeholder={t("writeHere")+" ..."} required />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-pink-500 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">{t("search")}</button>
        </div>
      </div>
    </div>
  );
}

export default SearchButton;
