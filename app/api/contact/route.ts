import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Mailer from '../../lib/mailer';
import { render } from '@react-email/render';
import ContactEmail, { ContactParams } from '../../components/Email/ContactEmail';

export const dynamic = 'force-static';

export async function POST(request: NextRequest) {
	const body: ContactParams = await request.json();
  
	console.log(body);

  await Mailer.sendMail({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    user: process.env.MAILER_USERNAME,
    password: process.env.MAILER_PASSWORD
  },
  {
    from: process.env.MAILER_FROM,
    to: process.env.MAILER_TO,
    subject: process.env.MAILER_SUBJECT,
    html: render(ContactEmail(body))
  });

  return NextResponse.json(
    body,
    {
      status: 200,
    },
  );
}