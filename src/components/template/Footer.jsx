import { useTranslation } from 'react-i18next';

const Footer=()=>{
  const { t } = useTranslation();

return(
  <footer className="mt-3 bg-pink-500 flex px-4 sm:px-10 min-h-[70px]">
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center justify-between w-full">
          <div className="flex gap-3">
            <p className="text-white text-sm">© Pet Paw | {t('comingSoon')}</p>
          </div>
        </div>
      </div>
  </footer>
);
}

export default Footer;
