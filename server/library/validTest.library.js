var testData = {
    'javascript': 'JS',
    'html': 'HTML',
    'css': 'CSS',
    'java': 'JAVA'
}

var levelData = {
    'intermediate': 'I',
    'beginner': 'B',
    'expert': 'E'
}

const setTestData = function(test, valule) {
    testData[test] = value;
}

const setLevelData = function(level, valule) {
    testData[level] = value;
}

const getTestData = function(test) {
    return testData[test];
}

const getLevelData = function(level) {
    return levelData[level];
}

module.exports = {
    setTestData: setTestData,
    setLevelData: setLevelData,
    getTestData: getTestData,
    getLevelData: getLevelData
}