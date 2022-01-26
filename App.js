import {TailwindProvider} from 'tailwind-rn';
import Home from './screens/Home';
import utilities from './tailwind.json';

const App = () => (
	<TailwindProvider utilities={utilities}>
		<Home />
	</TailwindProvider>
);

export default App;
