/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'
import { getLocalTime, getDisplayName } from 'utils'
import { Table } from '@pitrix/lego-ui'
import { Card } from 'components/Base'

import ProjectStore from 'stores/project'

import styles from './index.scss'

@inject('detailStore')
@observer
export default class MemberProjects extends React.Component {
  projectStore = new ProjectStore()

  componentDidMount() {
    this.projectStore.fetchList({ workspace: this.workspace })
  }

  get workspace() {
    return this.props.match.params.workspace
  }

  getColumns = () => [
    {
      title: t('Name'),
      dataIndex: 'name',
      width: '33%',
      render: (name, record) => getDisplayName(record),
    },
    {
      title: t('Created Time'),
      dataIndex: 'createTime',
      width: '33%',
      render: createTime => (
        <p>{getLocalTime(createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
      ),
    },
  ]

  render() {
    const { data, isLoading } = toJS(this.projectStore.list)

    return (
      <Card title={t('Projects')}>
        <Table
          className={styles.table}
          dataSource={data}
          columns={this.getColumns()}
          loading={isLoading}
        />
      </Card>
    )
  }
}
