import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/abstracts/_usersFilter.module.scss';
import CalendarIcon from '../../assets/icons/callender.png';

export interface UsersFilterValues {
  organization?: string;
  username?: string;
  email?: string;
  date?: string;
  phoneNumber?: string;
  status?: string;
}

interface UsersFilterProps {
  onApply: (values: UsersFilterValues) => void;
  onReset: () => void;
  onClose: () => void;
}

const UsersFilter = ({ onApply, onReset, onClose }: UsersFilterProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formValues, setFormValues] = useState({
    organization: '',
    status: ''
  });

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as UsersFilterValues;
    onApply(values);
  };

  const handleResetClick = () => {
    if (formRef.current) formRef.current.reset();
    setFormValues({ organization: '', status: '' });
    onReset();
  };

  return (
    <div className={styles.filterWrapper}>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label>
          Organization
          <select 
            name="organization" 
            value={formValues.organization} 
            onChange={handleSelectChange}
            className={formValues.organization ? styles.filled : ''}
          >
            <option value="" disabled hidden>Select</option> 
            <option value="Lendsqr">Lendsqr</option>
            <option value="Iridere">Iridere</option>
            <option value="Lexicon">Lexicon</option>
          </select>
        </label>

        <label>
          Username
          <input name="username" placeholder="User" />
        </label>

        <label>
          Email
          <input name="email" placeholder="Email" />
        </label>

        <label>
          Date
          <div className={styles.dateInputContainer}>
            <input 
              name="date" 
              type="text" 
              placeholder="Date" 
              onFocus={(e) => (e.target.type = "date")} 
              onBlur={(e) => !e.target.value && (e.target.type = "text")} 
            />
            <img src={CalendarIcon} alt="calendar" className={styles.calendarIcon} />
          </div>
        </label>

        <label>
          Phone Number
          <input name="phoneNumber" placeholder="Phone Number" />
        </label>

        <label>
          Status
          <select 
            name="status" 
            value={formValues.status} 
            onChange={handleSelectChange}
            className={formValues.status ? styles.filled : ''}
          >
            <option value="" disabled hidden>Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </label>

        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={handleResetClick} 
            className={styles.reset}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className={styles.filter}
          >
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersFilter;