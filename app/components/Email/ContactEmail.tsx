import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Section } from "@react-email/section";
import { Container } from "@react-email/container";

export interface ContactParams {
  name: string,
  email: string,
  message: string
}

export default function ContactEmail({ name, email, message }: ContactParams) {
  return (
    <Html>
      <Section style={ main }>
        <Container style={ container }>
          <Text style={ heading }>Contact message from { name } ({ email })</Text>
          <Text style={ paragraph }>{ message }</Text>
        </Container>
      </Section>
    </Html>
  );
}

// Styles for the email template
const main = {
  backgroundColor: "#FFF",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};
