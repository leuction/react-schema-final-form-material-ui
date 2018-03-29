// Rollup plugins.
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

// Import the development configuration.
import config from './dev';

// Inject the production settings.
config.plugins[3] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') });
config.plugins.push(uglify());
config.sourcemap = false;

export default config;
