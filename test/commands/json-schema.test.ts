import {expect, test} from '@oclif/test'

describe('json-schema', () => {
  test
  .stdout()
  .command(['json-schema'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['json-schema', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
