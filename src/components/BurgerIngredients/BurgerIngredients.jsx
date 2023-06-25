import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab';
import { data } from '../../utils/data';
import BIStyle from './BurgerIngredients.module.css';
import Card from '../Card/Card';

const BurgerIngredients = () => {
  const [currentTab, setCurrentTab] = useState('bun');

  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const ref = document.getElementById(tab);
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={BIStyle.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={currentTab === 'bun'} onClick={() => onTabClick('bun')}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => onTabClick('sauce')}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === 'main'} onClick={() => onTabClick('main')}>
          Начинки
        </Tab>
      </div>
      <div className={BIStyle.container + ' pl-4 pr-4'}>
        {['bun', 'sauce', 'main'].map((tab) => (
          <div key={tab} id={tab}>
            <h2 className="text text_type_main-medium mt-10 mb-6">
              {tab === 'bun' ? 'Булки' : tab === 'sauce' ? 'Соусы' : 'Начинка'}
            </h2>
            <ul className={`${BIStyle['card-list']} pl-4 pr-4`}>
              {data.map((item) => {
                if (item.type === tab) {
                  return (
                    <Card
                      key={item._id}
                      image={item.image}
                      price={item.price}
                      count={item.count}
                      name={item.name}
                    />
                  );
                }
                return null;
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;