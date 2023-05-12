import React, { RefObject, createContext, useState } from 'react';

interface PopUp {
  id: number;
  state: boolean;
  popup: RefObject<HTMLDivElement> | null;
  icon: RefObject<SVGSVGElement> | null;
}

interface PopUpsManager {
  listOfPopUps: PopUp[];
  setPopUps: (listOfPopUps: PopUp[]) => void;
  popUpHandler: (id: number) => void;
  closePopUps: () => void;
}

interface PopUpsProviderProps {
  children: React.ReactNode;
}

export const popUpsContext = createContext<PopUpsManager>({
  listOfPopUps: [],
  setPopUps: () => {
    /* */
  },
  closePopUps: () => {
    /* */
  },
  popUpHandler: () => {
    /* */
  },
});

export const PopUpsProvider = ({ children }: PopUpsProviderProps) => {
  const [listOfPopUps, setListOfPopUps] = useState<PopUp[]>([
    { id: 0, state: false, popup: null, icon: null },
    { id: 1, state: false, popup: null, icon: null },
    { id: 2, state: false, popup: null, icon: null },
    { id: 3, state: false, popup: null, icon: null },
  ]);

  const setPopUps = (list: PopUp[]) => {
    setListOfPopUps(list);
  };

  const popUpHandler = (id: number) => {
    if (listOfPopUps) {
      const copy = listOfPopUps.map((x) => x);
      copy.map((e) => {
        if (e.id === id) {
          if (e.state === false) {
            e.state = true;
          } else {
            e.state = false;
          }
        } else {
          e.state = false;
        }
      });
      setListOfPopUps(copy);
    }
  };

  const closePopUps = () => {
    if (listOfPopUps) {
      const copy = listOfPopUps.map((x) => x);
      copy.map((e) => (e.state = false));
      setListOfPopUps(copy);
    }
  };

  const value = {
    listOfPopUps,
    setPopUps,
    setListOfPopUps,
    popUpHandler,
    closePopUps,
  };
  return (
    <popUpsContext.Provider value={value}>{children}</popUpsContext.Provider>
  );
};
