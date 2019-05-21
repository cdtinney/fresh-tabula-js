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
        'package.json',
      ],
      'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
    '@semantic-release/github',
  ],
};
