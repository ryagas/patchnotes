import { undent } from '@bscotch/utility';
import { GitMessage } from '../lib/Message.js';

describe('Commit message parser', function () {
  const sampleMessage = undent`
    feat: Added some feature.

    Here is a body for that feature that we just added.
    It has multiple lines.

    chore: Did something we don't want to report.

    This is the chore's body. It shouldn't even show up anywhere.

    docs(Dev): Updated something in the docs.
    docs(Build): Built something whatever
    and then here's stuff on another line.

    fix(pub|Dev): Fixed something that was broken.
    I have a second line on this message.

    And her is the fix's body. It
    Here is a footer with some keywords in it:
    Closes #55. Thanks to @ryagas. BREAKING.

    feat(pub|Format): Add an HTML output option.
    #dev #private
    `;

  it('can parse a complex message.', function () {
    const parsed = GitMessage.parse(sampleMessage);
    console.log(parsed);
  });
});
