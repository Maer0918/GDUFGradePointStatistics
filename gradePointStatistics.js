(() => {
	// 在成绩页面中，存放成绩的表格元素 ID 为 dataList
	var dataList = document.querySelector('#dataList')
	var data = dataList.querySelector('tbody')
	var lessonList = data.querySelectorAll('tr')
	var headers = lessonList[0].querySelectorAll('th')

	// 获得课程名称、成绩、学分、课程性质在表格中的序号
	var nameOrder = null
	var gradeOrder = null
	var gradePointOrder = null
	var propertyOrder = null
	for (let i = 0; i < headers.length; i++) {
		if (headers[i].innerText === '课程名称') 
			nameOrder = i
		if (headers[i].innerText === '成绩')
			gradeOrder = i
		if (headers[i].innerText === '学分')
			gradePointOrder = i
		if (headers[i].innerText === '课程性质')
			propertyOrder = i
	}

	// 进行汇总
	var summary = {}
	// i = 1，忽略首行标题
	for (let i = 1; i < lessonList.length; i++) {
		var lessonAttributes = lessonList[i].querySelectorAll('td')
		// 定义课程对象
		var lesson = {
			name: lessonAttributes[nameOrder].innerText,
			grade: lessonAttributes[gradeOrder].innerText,
			gradePoint: lessonAttributes[gradePointOrder].innerText,
			property: lessonAttributes[propertyOrder].innerText
		}
		if (summary[lesson.property] == undefined)
			summary[lesson.property] = {
				property: lesson.property,
				lessons: [],
				gradePoint: 0
			}
		if (lesson.grade === '合格' || parseInt(lesson.grade) >= 60) {
			summary[lesson.property].gradePoint += parseInt(lesson.gradePoint)
			summary[lesson.property].lessons.push(lesson)
		}
	}

	// 显示汇总
	var result = ''
	for (property in summary) {
		var heading =`课程属性：${property} 总得学分：${summary[property].gradePoint}\n合格课程：` 
		result += heading + '\n'
		console.log(heading)
		var lessons = summary[property].lessons
		for(let i = 0; i < lessons.length; i++) {
			var lesson = lessons[i]
			var info = `${i+1}. ${lesson.name} ${lesson.grade} ${lesson.gradePoint}`
			result += info + '\n'
			console.log(info)
		}
		result += '\n'
	}

	// 结果汇总至页尾
	var clip = document.createElement('div')
	clip.innerText = result
	document.body.appendChild(clip)
}) ()
