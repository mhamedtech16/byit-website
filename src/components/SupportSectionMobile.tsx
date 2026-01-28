import { easeOut, motion } from "framer-motion";
import React from "react";

import useGetApis from "@/Apis/useGetApis";
import { icons } from "@/assets";
import { SettingsProps } from "@/types/Settings";

import { ImageIcon } from "./ImageIcon";
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {
    scale: 1.05,
    y: -4,
    transition: {
      duration: 0.2,
      ease: easeOut,
    },
  },
};
const messages = {
  cil: "Hi, i’d like to send a CIL.مرحباً، أود أن أرسل جواب بيانات العميل",
  closingForm:
    "Hi, i’d like to sign my legal contract.مرحباً، أود حجز موعد لإمضاء عقد العمولة.",
  contract:
    "Hi, i’m going to close a deal tomorrow.مرحباً، سأذهب لإتمام صفقة غداً.",
  coverage:
    "Hi, I need someone to cover a meeting for me.مرحباً، أحتاج شخصاً لحضور موعد نيابة عني.",
};

const SupportSectionMobile = () => {
  const [contactUs, setContactUs] = React.useState<SettingsProps>();
  const { getAppSettingApi } = useGetApis();

  const fetchData = React.useCallback(async () => {
    try {
      const res = await getAppSettingApi();
      setContactUs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [getAppSettingApi]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contactItems = [
    {
      id: 1,
      label: "Customer Service Phone",
      value: contactUs?.customerServicePhone,
      icon: icons.support,
    },
    {
      id: 2,
      label: "CIL Phone",
      value: contactUs?.cilPhone,
      icon: icons.cil_phone,
    },
    {
      id: 3,
      label: "Closing Support Phone",
      value: contactUs?.closingSupportPhone,
      icon: icons.closing_form,
    },
    {
      id: 4,
      label: "Contract Phone",
      value: contactUs?.contractPhone,
      icon: icons.contract,
    },
    {
      id: 5,
      label: "Coverage Phone",
      value: contactUs?.coveragePhone,
      icon: icons.hand_shake,
    },
  ];

  const handleCall = (value: string | undefined) => {
    const item = contactItems.find((el) => el.value === value);
    if (item?.id === 1) {
      window.open(`tel:${item.value}`);
    } else if (item?.id === 2) {
      window.open(`https://wa.me/${item.value}?text=${messages.cil}`);
    } else if (item?.id === 3) {
      window.open(`https://wa.me/${item.value}?text=${messages.closingForm}`);
    } else if (item?.id === 4) {
      window.open(`https://wa.me/${item.value}?text=${messages.contract}`);
    } else if (item?.id === 5) {
      window.open(`https://wa.me/${item.value}?text=${messages.coverage}`);
    }
  };
  return (
    <section
      className="flex flex-col bg-[#f3f2f1] items-center justify-center gap-6 mb-4 pt-4 px-5"
      //   variants={containerVariants}
      //   initial="hidden"
      //   animate="visible"
    >
      <motion.p
        variants={itemVariants}
        className="text-3xl font-bold text-primary mb-2"
      >
        Contact to
      </motion.p>

      {/* <motion.p
        variants={itemVariants}
        className="text-primary/90 text-center max-w-md mb-10"
      >
        You can get in touch with us through below platforms. Our Team will
        reach out to you as soon as it would be possible
      </motion.p> */}
      <div className="flex flex-col items-center justify-center gap-8">
        {contactItems.map((item, index) => (
          <motion.button
            key={index}
            className="flex flex-col space-y-6 items-center border border-primary hover:bg-primary/50 hover:text-white hover:border bg-primary/30 w-full p-5 cursor-pointer rounded-lg"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            whileHover="hover"
            onClick={() => handleCall(item.value)}
          >
            <div className="bg-white w-15 h-15 flex items-center justify-center rounded-full">
              <ImageIcon src={item.icon} size={30} alt={item.label} />
            </div>
            <strong className="text-black">{item.label}</strong>
            <p className="text-black">{item.value}</p>
          </motion.button>
        ))}
      </div>
    </section>
  );
};

export default SupportSectionMobile;
