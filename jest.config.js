module.exports = async () => {
  return {
    preset: '@shelf/jest-mongodb',
    collectCoverage: true,
    verbose: true,
    rootDir: './'
  }
}
