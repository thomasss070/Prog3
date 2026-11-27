import '../styles/SettingsScreen.css';
import { useSettings } from '../context/SettingsContext';

function SettingsScreen() {
  const { settings, updateSetting } = useSettings();

  return (
    <div className="settings">
      <header className="settings__header">
        <h1 className="settings__title">Ajustes</h1>
      </header>

      <main className="settings__main">
        <label className="settings__row" htmlFor="notifications">
          <span>Notificaciones</span>
          <input
            id="notifications"
            className="settings__switch"
            type="checkbox"
            role="switch"
            checked={settings.notifications}
            onChange={(e) => updateSetting('notifications', e.target.checked)}
          />
        </label>

        <label className="settings__row" htmlFor="darkMode">
          <span>Modo oscuro</span>
          <input
            id="darkMode"
            className="settings__switch"
            type="checkbox"
            role="switch"
            checked={settings.darkMode}
            onChange={(e) => updateSetting('darkMode', e.target.checked)}
          />
        </label>
      </main>
    </div>
  );
}

export default SettingsScreen;