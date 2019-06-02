module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [{
        type: 'docs',
        release: 'patch',
      }, {
        type: 'ci',
        release: 'patch',
      }, {
        type: 'refactor',
        release: 'patch',
      }],
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm', [
    '@semantic-release/git', {
      assets: [
        'lib/**/*.js',
        'bin',
        'CHANGELOG.md',
        'package.json',
      ],
    }],
    '@semantic-release/github',
  ],
};
