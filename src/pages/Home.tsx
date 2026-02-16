import { PrimaryButton } from "@/components/atoms/PrimaryButton";
import { SecondaryButton } from "@/components/atoms/SecondaryButton";
import { Card, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [id, setId] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  return (
    <Flex justify="center" align="center" p={4} direction="column">
      <form onSubmit={() => navigate(`/cards/${id}`)}>
        <Card.Root shadow={"sm"} textAlign="center" p={6}>
          <Text as="h1"> IDを入力してください</Text>

          <Input
            mt={2}
            placeholder="Card ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={(e) => {
              if (e.target.value.length < 1) setError(true);
              else setError(false);
            }}
            data-testid="input"
          />
          {error && <p style={{ color: "red" }}>IDを入力してください</p>}
          <PrimaryButton
            mt={2}
            disabled={id.length < 1 || error}
            type="submit"
            data-testid="submit"
          >
            検索
          </PrimaryButton>
        </Card.Root>
      </form>
      <SecondaryButton
        mt={2}
        type="button"
        data-testid="to-register"
        onClick={() => navigate("/cards/register")}
      >
        新規登録はこちら
      </SecondaryButton>
    </Flex>
  );
};
