import Stats from '../Stats';
import Countdown from '../Countdown';
import History from '../History';

export default function Dashboard() {
  return (
    <section id="dashboard">
      <Stats />
      <Countdown />
      <History />
    </section>
  );
}
