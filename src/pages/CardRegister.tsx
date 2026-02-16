import { CardInput } from "@/components/atoms/CardInput";
import { CardTextArea } from "@/components/atoms/CardTextArea";
import { PrimaryButton } from "@/components/atoms/PrimaryButton";
import { toaster } from "@/components/ui/toaster";
import { User } from "@/types/api/User";
import { registerUser } from "@/utils/supabase";
import {
  Box,
  Card,
  createListCollection,
  Flex,
  Portal,
  Select,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CardRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>();

  const skills = createListCollection({
    items: [
      { label: "React", value: 1 },
      { label: "TypeScript", value: 2 },
      { label: "GitHub", value: 3 },
    ],
  });
  return (
    <Box display="flex" justifyContent="center">
      <Flex direction="column">
        <Box display="flex" justifyContent="center" py={4}>
          <Text as="h1" textStyle="lg" fontWeight="bold">
            名刺の新規登録
          </Text>
        </Box>
        <form
          id="card-register-form"
          onSubmit={handleSubmit(async (data) => {
            try {
              await registerUser(data);
              toaster.create({
                description: "登録しました",
                type: "success",
              });
              navigate("/");
            } catch {
              toaster.create({
                description: "登録に失敗しました",
                type: "error",
              });
            }
          })}
        >
          <Card.Root my={2}>
            <Card.Body gap={2}>
              <Text textStyle="sm">好きな英単語</Text>

              <CardInput
                id="id"
                data-testid="id"
                placeholder="coffee"
                {...register("id", {
                  required: true,
                  pattern: /^[a-zA-Z\s]+$/,
                })}
              />
              <Text color="red">{errors.id && "英単語を入力してください"}</Text>
              <Text textStyle="sm">お名前 *</Text>
              <CardInput
                id="name"
                data-testid="name"
                {...register("name", { required: true })}
              />
              {errors.name && <Text color="red">お名前を入力してください</Text>}
              <Text textStyle="sm">自己紹介 *</Text>
              <CardTextArea
                id="description"
                data-testid="description"
                height="120px"
                placeholder="<h1>HTMLタグも使えます</h1>"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <Text color="red">自己紹介を入力してください</Text>
              )}
              <Controller
                name="skills"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select.Root
                    collection={skills}
                    data-testid="skills"
                    value={field.value ?? []}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                  >
                    <Select.Label>好きな技術 *</Select.Label>
                    <Select.Control>
                      <Select.Trigger border="1px solid #aaa" data-testid="skills-trigger">
                        <Select.ValueText placeholder="Select framework" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {skills.items.map((skill) => (
                            <Select.Item
                              item={skill}
                              key={skill.value}
                              data-testid={`skill-${skill.value}`}
                            >
                              {skill.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root>
                )}
              />
              {errors.skills && <Text color="red">技術を選択してください</Text>}
              <Text textStyle="sm">GitHub ID</Text>
              <CardInput
                id="githubId"
                data-testid="githubId"
                {...register("githubId")}
              />
              <Text textStyle="sm">Qiita ID</Text>
              <CardInput
                id="qiitaId"
                data-testid="qiitaId"
                {...register("qiitaId")}
              />
              <Text textStyle="sm">X ID</Text>
              <CardInput id="xId" data-testid="xId" {...register("xId")} />
            </Card.Body>
            <Card.Footer>
              <PrimaryButton
                type="submit"
                form="card-register-form"
                fontWeight="bold"
                data-testid="register"
              >
                登録
              </PrimaryButton>
            </Card.Footer>
          </Card.Root>
        </form>
      </Flex>
    </Box>
  );
};
