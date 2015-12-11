read word _ < test_machine
export ACCEPTANCE_URL=http://"$word"
export MOCHA_REPORTER=xunit
export MOCHA_REPORT=server-tests.xml
grunt mochaTest:load