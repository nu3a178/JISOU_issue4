import { User } from "@/types/api/User";
import { getUser, getUserSkills } from "@/utils/supabase";
import { Spinner, Text, Card, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { PrimaryButton } from "@/components/atoms/PrimaryButton";

export const UserCard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const fetchUser = async (id: string) => {
    try {
      const userData = await getUser(id);
      const skills = await getUserSkills(id);
      setUser({ ...userData, skills: skills.map((skill) => skill.name) });
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const descriptionPreview = () => {
    return (
      <Text
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(user?.description || ""),
        }}
      ></Text>
    );
  };
  return (
    <Flex justify="center" h="100vh" p={4}>
      <Box w="260px">
        <Card.Root shadow={"sm"} w="100%">
          {isLoading ? (
            <Flex justify="center" align="center" h="100%">
              <Spinner size="lg" />
            </Flex>
          ) : isError ? (
            <Flex justify="center" align="center" h="100%">
              <Text>Error loading user data</Text>
            </Flex>
          ) : (
            <>
              <Card.Header>
                <Text
                  as="h1"
                  textStyle="2xl"
                  fontWeight="bold"
                  data-testid="name"
                >
                  {` ${user?.name}`}
                </Text>
              </Card.Header>
              <Card.Body>
                <Box spaceY={1}>
                  <Text fontWeight="bold">{`自己紹介`}</Text>
                  {descriptionPreview()}

                  <Text fontWeight="bold"> {`好きな技術`}</Text>
                  <Text data-testid="skill">
                    {` ${user?.skills?.join(", ")}`}
                  </Text>
                </Box>
              </Card.Body>
              <Card.Footer justifyContent="center">
                <Flex gap={4} justify="center">
                  {user?.githubId && (
                    <a
                      href={user?.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="github-link"
                    >
                      <img src="/src/assets/github.svg" width="40" />
                    </a>
                  )}
                  {user?.qiitaId && (
                    <a
                      href={user?.qiitaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="qiita-link"
                    >
                      <img src="/src/assets/qiita.png" width="40" />
                    </a>
                  )}
                  {user?.xId && (
                    <a
                      href={user?.xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="x-link"
                    >
                      <img src="/src/assets/x.png" width="40" />
                    </a>
                  )}
                </Flex>
              </Card.Footer>
            </>
          )}
        </Card.Root>
        <PrimaryButton
          onClick={() => navigate("/")}
          mt={4}
          w="100%"
          data-testid="back-button"
        >
          戻る
        </PrimaryButton>
      </Box>
    </Flex>
  );
};
