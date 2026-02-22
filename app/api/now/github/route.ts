import axios from "axios";
import { NextResponse } from "next/server";

import { USERNAME } from "@/lib/constants";
import { env } from "@/lib/env";
import { redis } from "@/lib/redis";

export async function GET() {
	const contributions = await getGithubContributions();

	return NextResponse.json(contributions);
}

async function getGithubContributions() {
	const cachedContributions = await redis.get("github:contributions");

	if (cachedContributions) {
		return JSON.parse(cachedContributions);
	}

	const contributionsResponse = await axios
		.post(
			"https://api.github.com/graphql",
			{
				variables: {
					userName: USERNAME,
				},
				query: `
        query ($userName: String!) {
          user(login: $userName) {
            repositories(first: 1, orderBy: { direction: DESC, field: PUSHED_AT }) {
              nodes {
                name
                pushedAt
              }
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
      `,
			},
			{
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				},
			},
		)
		.catch(() => null);

	if (!contributionsResponse) {
		return {
			lastPushedAt: null,
			totalContributions: 0,
			data: [],
		};
	}

	const parsedResponse = contributionsResponse.data?.data?.user?.contributionsCollection?.contributionCalendar;

	const contributions = {
		lastPushedAt: contributionsResponse.data?.data?.user?.repositories?.nodes?.[0]?.pushedAt,
		totalContributions: parsedResponse?.totalContributions,
		items: parsedResponse?.weeks?.flatMap((week: any) => {
			return week?.contributionDays?.map((day: any) => {
				return {
					date: day.date.replace(/-/g, "/"),
					count: day.contributionCount,
				};
			});
		}),
	};

	await redis.set(
		"github:contributions",
		JSON.stringify(contributions),
		"EX",
		60 * 5, // 5 minutes
	);

	return contributions;
}
