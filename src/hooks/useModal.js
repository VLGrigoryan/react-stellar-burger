import { useState, useCallback } from "react";
import ingredients from "../services/reducers/ingredients";

export const useModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
};

// Функция для сохранения данных в localStorage
export const saveModalState = (data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem('modalState', serializedData);
    } catch (error) {
      // Обработка ошибок при сохранении данных
      console.error('Error saving modal state:', error);
    }
  };
  
  // Функция для загрузки данных из localStorage
  export const getModalState = () => {
    try {
      const serializedData = localStorage.getItem('modalState');
      if (serializedData === null) {
        return null; // Если данных нет в localStorage
      }
      return JSON.parse(serializedData);
    } catch (error) {
      // Обработка ошибок при загрузке данных
      console.error('Error getting modal state:', error);
      return null;
    }
  };