import React from 'react';
import {
	Button,
	Divider,
	Grid,
	GridColumn,
	Header,
	Item,
	ItemGroup,
	Reveal,
	Segment,
	Statistic,
} from 'semantic-ui-react';

const ProfileHeader = ({ profile }) => {
	return (
		<Segment>
			<Grid>
				<GridColumn width={12}>
					<ItemGroup>
						<Item>
							<Item.Image avatar size='small' src='/assets/user.png' />
							<Item.Content verticalAlign='middle'>
								<Header
									as='h1'
									style={{ display: 'block', marginBottom: 10 }}
									content={profile.displayName}
								/>
							</Item.Content>
						</Item>
					</ItemGroup>
				</GridColumn>
				<GridColumn width={4}>
					<Statistic.Group>
						<Statistic label='Followers' value={10} />
						<Statistic label='Following' value={5} />
					</Statistic.Group>
					<Divider />
					<Reveal animated='move'>
						<Reveal.Content visible style={{ width: '100%' }}>
							<Button fluid color='teal' content='following'></Button>
						</Reveal.Content>
						<Reveal.Content hidden style={{ width: '100%' }}>
							<Button basic fluid color='red' content='unfollow'></Button>
						</Reveal.Content>
					</Reveal>
				</GridColumn>
			</Grid>
		</Segment>
	);
};

export default ProfileHeader;
