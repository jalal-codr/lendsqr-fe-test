import styles from '../../styles/abstracts/_usersFilter.module.scss';

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as UsersFilterValues;

    onApply(values);
    onClose();
  };

  return (
    <div className={styles.filterWrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          Organization
          <select name="organization">
            <option value="">Select</option>
            <option value="Lendsqr">Lendsqr</option>
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
          <input name="date" type="date" />
        </label>

        <label>
          Phone Number
          <input name="phoneNumber" placeholder="Phone Number" />
        </label>

        <label>
          Status
          <select name="status">
            <option value="">Select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
            <option value="Blacklisted">Blacklisted</option>
          </select>
        </label>

        <div className={styles.actions}>
          <button type="button" onClick={onReset} className={styles.reset}>
            Reset
          </button>
          <button type="submit" className={styles.filter}>
            Filter
          </button>
        </div>
      </form>
    </div>
  );
};

export default UsersFilter;